sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("com.sap.dsc.ids.wty.supplierClerkUI.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "com.sap.dsc.ids.wty.supplierClerkUI",
          async: true,
          manifest: true
        }
      });
    }

  });
});
