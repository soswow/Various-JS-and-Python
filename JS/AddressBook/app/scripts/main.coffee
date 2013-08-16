$ ->
  $("button").click ->
    $("#top-form").toggleClass 'opened'
    $("#search-add-field").attr 'placeholder', 'Full name'
    $("label[for=search-add-field] i").removeClass().addClass('icon-user')