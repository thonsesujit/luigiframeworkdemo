sap.ui.define([
  "com/sap/dsc/ids/wty/supplierClerkUI/controller/BaseController",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History",
  "sap/ui/model/json/JSONModel"


], function (BaseController, UIComponent, History, JSONModel) {
  "use strict";

  return BaseController.extend("com.sap.dsc.ids.wty.supplierClerkUI.controller.DefectAnalysis", {

    onInit: function () {
      // this.getOwnerComponent().setModel(new JSONModel("model/carData.json"), "carData");
      this.getOwnerComponent().setModel(new JSONModel(), "carDataSet");
    },

    onCarDataListItemPressed: function(oEvent) {
      var carDataPath = oEvent.getSource().getBindingContextPath();
      var carDataSetId = carDataPath.split("/").slice(-1).pop();

      var carDataSet = this.getOwnerComponent().getModel("carData").getProperty("/" + carDataSetId);
      this.getOwnerComponent().getModel("carDataSet").setData(carDataSet);
    },

    //TODO: need to implement this function in the base controller to follow DRY coding practices.
    onNavBack: function () {
      //very simple version for navigate back
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("RouteView1");
    },

    onNavtoReportSummary: function () {
      var oRouter = UIComponent.getRouterFor(this);
      // use route name 'DefectAnalysis' here
      oRouter.navTo("SummaryDefectAnalysis", {}, true);
    }

  });
});
