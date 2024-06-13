pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "@hotwired--stimulus.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin "chartkick", to: "chartkick.js", preload: true
pin "Chart.bundle", to: "Chart.bundle.js", preload: true
pin "jquery", to: "jquery.min.js", preload: true
pin "popper.js", to: "popper.js", preload: true
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "select2", to: "select2.min.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "stimulus-autocomplete"
