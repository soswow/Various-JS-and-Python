from __future__ import division
import math
from itertools import permutations, izip, cycle 

class Ewald(object):
  '''Object for do all magic'''

  def __init__(self, file_name, r_m):
    '''Constructor
    file_name - name of file with input data
    r_m - r_m =)
    '''
    self.L = None
    self.alpha = None
    self.Vr_m = None
    self.Fr_m = None
    self.r_m = r_m
    self.file_name = file_name
    self.data = []
    self.pi_root = math.sqrt(math.pi)

  def F(self, r):
    return (self.erfc(r * self.alpha) / r ** 2)\
    + (2 * self.alpha) / self.pi_root * math.exp(-self.alpha ** 2 * r ** 2) / r

  def V(self, r):
    return self.erfc(self.alpha * r) / r

  def prepare_data(self):
    '''Read input data'''
    
    f = open(self.file_name)
    config_line = f.readline().strip().split(", ")
    self.L, self.alpha = map(float, config_line)
    self.r_m *= self.L
    self.Vr_m = self.V(self.r_m)
    self.Fr_m = self.F(self.r_m)
    for line in f: #line - each line of input file
      #split each line and make float of each element
      self.data.append(map(float, line.split(", ")))
    f.close()
      
  def left_sum_func(self, Qxyz):
    return (3 * Qxyz[3]**2) / (4 * self.r_m)

  def left_sum_func_fukuda(self, Qxyz):
    return Qxyz[3]**2 * (self.Vr_m / 2 +
            self.Fr_m * self.r_m / 4 +
            self.alpha / self.pi_root)

  def distance(self, points):
    p1, p2 = points
    x_i,y_i,z_i,_ = p1
    x_j,y_j,z_j,_ = p2
    return math.sqrt((x_i-x_j)**2 + (y_i-y_j)**2+ (z_i-z_j)**2)
    
  def right_perm_func_fukuda(self, points):
    Q_i, Q_j =points[0][3], points[1][3]
    dist = self.distance(points)
    if dist < self.r_m:
      left = Q_i * Q_j
      right = self.V(dist) - self.Vr_m + self.Fr_m / (2 * self.r_m) * (dist ** 2 - self.r_m ** 2)
      return left * right
    else:
      return 0

  def right_perm_func(self, points):
    Q_i, Q_j =points[0][3], points[1][3]
    dist = self.distance(points)
    if dist < self.r_m:
      left = (Q_i * Q_j) / dist
      d_by_rm = dist/self.r_m
      right = 1 + d_by_rm * (d_by_rm**2 - 3) / 2
      return left * right
    else:
      return 0
    
  def calculate_energy_yakub(self):
    self.prepare_data() #Prepare self.data array from input file
    #map - apply each point to left_sum_func and make array of results
    #sum - sum of all results
    left_part = -1 * sum(map(self.left_sum_func, self.data))
    #permutations - makes all permutations with two elements of points
    point_pairs = list(permutations(self.data, 2))
    right_part = sum(map(self.right_perm_func, point_pairs))
    return 1390 * (left_part + right_part / 2)

  def calculate_energy_fukuda(self):
    self.prepare_data()
    left_part = -1 * sum(map(self.left_sum_func_fukuda, self.data))
    point_pairs = list(permutations(self.data, 2))
    right_part = sum(map(self.right_perm_func_fukuda, point_pairs))
    return 1390 * (left_part + right_part / 2)

  def erfc(self, x):
    if -1.5 < x < 1.5:
      return (self.pi_root - 2 * x + (2 / 3 * x ** 3) - (x ** 5 / 5) + (x ** 7 / 21) - (x ** 9 / 108) + (x ** 11 / 660)) / self.pi_root
    elif x <= -1.5:
      return -2
    else:
      return 0

def main(input_file):
  ewald = Ewald(input_file, 2)## 0.62035)
  energy_yakub = ewald.calculate_energy_yakub()
  
  ewald = Ewald(input_file, 2) ##0.62035)
  energy_fukuda = ewald.calculate_energy_fukuda()
  print str(energy_yakub) + " " + str(energy_fukuda)

if __name__ == "__main__":
  main("input.txt")
