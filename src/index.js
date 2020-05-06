import "jquery-ui-css/core.css";
import "jquery-ui-css/theme.css";
import "jquery-ui-css/menu.css";
import core from "jquery-core/core";

import "jquery-ui-css/progressbar.css";
import progressbar from "jquery-ui/progressbar";

$(function () {
  $("#progressbar").progressbar({
    value: 37,
  });
});
