sap.ui.define([
  "sap/ui/test/opaQunit",
  "com/sap/dsc/ids/wty/supplierClerkUI/test/integration/pages/View1"
], function (opaTest) {
  "use strict";

  opaTest("should show correct number of nested pages", function (Given, When, Then) {

    // Arrangements
    Given.iStartMyApp();

    // Assertions
    Then.onTheAppPage.iShouldSeePageCount(1);

    // Cleanup
    Then.iTeardownMyApp();
  });

});
