sap.ui.define([
  "com/sap/dsc/ids/wty/supplierClerkUI/controller/BaseController",
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
  
], function(BaseController, UIComponent, JSONModel) {
  "use strict";

  return BaseController.extend("com.sap.dsc.ids.wty.supplierClerkUI.controller.SummaryDefectAnalysis", {

    onInit: function () {
      
      // create model for table historical QM notifications
      var oModelHist = new JSONModel();
      oModelHist.loadData("model/mocDataAnalysis.json");
      this.getView().setModel(oModelHist, "mocDataAnalysis");
    },

    onNavBack: function () {
      //very simple version for navigate back
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("DefectAnalysis");
    },

  });
});
