float alpha, beta;

int W = 700;
int H = 500;

float bigD = 400;
float thickness = 50;
int numberOfSections = 10;
float sectionGap = 10.0;

float smallD, sectionAngle;
PVector center;

ArrayList<GcodeCommand> commands = new ArrayList<GcodeCommand>();

void settings(){
  size(W, H);
}

class GcodeCommand{
  public float feedRate = 0;
}

class G2 extends GcodeCommand{
  G2 (PVector destination, PVector center) {
    this.destination = destination;
    this.center = center;
  }
  
  public PVector destination;
  public PVector center;
  public String toString(){
    return String.format(
      "G2 X%.4f Y%.4f I%.4f J%.4f E%.4f", 
      destination.x,
      destination.y,
      center.x,
      center.y,
      feedRate);
  }
}

void draw(){
  commands.clear();
  
  bigD = 500;
  thickness = 68;
  numberOfSections = 24;
  sectionGap = 13.0;
  
  center = new PVector(bigD/2+10, bigD/2+10);
  
  smallD = bigD - thickness;
  sectionAngle = 360 / numberOfSections;
  
  background(255);
  stroke(0);
  noFill();
  
  //float endAngle = 0;
  float prevEndAngle = 0;
  //float i=0;
  //for (int i=0; i<numberOfSections; i++) {
  for (int i=0; i<2; i++) {
    float startAngle = prevEndAngle;
    float endAngle = (i+1)*sectionAngle;
    float d = bigD + (bigD-smallD)/2;
    d *= 0.6;
    // We move anti-clock wise
    //First curve
    PVector[] intersection34 = drawSectionCurve(endAngle, d, d/2);
    //Second curve
    PVector[] intersection12 = drawSectionCurve(startAngle, d-sectionGap, d/2);
    prevEndAngle = endAngle;
    
    //Outside curve
    alpha = atan2(intersection34[1].y - center.y, intersection34[1].x - center.x);
    beta = atan2(intersection12[1].y - center.y, intersection12[1].x - center.x);
    alpha = fixSmallerAngle(alpha, beta);
    
    arc(center.x, center.y, bigD, bigD, alpha, beta);
  
    //Inner curve
    alpha = atan2(intersection34[0].y - center.y, intersection34[0].x - center.x);
    beta = atan2(intersection12[0].y - center.y, intersection12[0].x - center.x);
    alpha = fixSmallerAngle(alpha, beta);
    
    arc(center.x, center.y, smallD, smallD, alpha, beta);
  }
}

float fixSmallerAngle(float smallerAngle, float biggerAngle){
  if(smallerAngle > biggerAngle){
    smallerAngle -= TWO_PI;
  }
  return smallerAngle;
}

PVector[] drawSectionCurve(float angle, float d, float r) {
  float arcx = sin(radians(angle)) * r;
  float arcy = cos(radians(angle)) * r;
  
  PVector interesction1 = firstInterection(
    new PVector(center.x, center.y),
    smallD,
    new PVector(center.x-arcx, center.y-arcy),
    d
  );
  
  PVector interesction2 = firstInterection(
    new PVector(center.x, center.y),
    bigD,
    new PVector(center.x-arcx, center.y-arcy),
    d
  );
  
  alpha = atan2(interesction2.y - (center.y-arcy), interesction2.x - (center.x-arcx));
  beta = atan2(interesction1.y - (center.y-arcy), interesction1.x - (center.x-arcx));
  alpha = fixSmallerAngle(alpha, beta);
  
  arc(center.x-arcx, center.y-arcy, d, d, alpha, beta);
  //arc(center.x-arcx, center.y-arcy, d, d, 0, TWO_PI);
  
  return new PVector[]{interesction1, interesction2};
}

PVector firstInterection(PVector p0, float d1, PVector p1, float d2){
  float d = dist(p0.x, p0.y, p1.x, p1.y);
  float a = (pow(d1/2, 2) - pow(d2/2, 2) + pow(d, 2)) / (d * 2);
  float h = sqrt(pow(d1/2, 2) - pow(a, 2));
  PVector p2 = new PVector(
    p0.x + a * (p1.x - p0.x)/d,
    p0.y + a * (p1.y - p0.y)/d
  );
  return new PVector(
    p2.x - h * (p1.y - p0.y) / d,
    p2.y + h * (p1.x - p0.x) / d
  );
  
}