sap.ui.define([
  "sap/ui/test/Opa5",
  "com/sap/dsc/ids/wty/supplierClerkUI/test/integration/arrangements/Startup",
  "com/sap/dsc/ids/wty/supplierClerkUI/test/integration/BasicJourney"
], function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    pollingInterval: 1
  });

});
