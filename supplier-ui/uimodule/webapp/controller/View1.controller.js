sap.ui.define([
  "com/sap/dsc/ids/wty/supplierClerkUI/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/core/Fragment",
  "sap/ui/core/UIComponent",

], function (BaseController, JSONModel, MessageToast, MessageBox, Fragment, UIComponent) {
  "use strict";

  return BaseController.extend("com.sap.dsc.ids.wty.supplierClerkUI.controller.View1", {

    onInit: function () {
      //Creating model for requesting additional data for defect analysis
      var oModel = new JSONModel();
      oModel.loadData("model/RequestData.json");
      this.getView().setModel(oModel);

      // create model for table historical QM notifications
      var oModelHist = new JSONModel();
      oModelHist.loadData("model/HistoricalQMNotifications.json");
      this.getView().setModel(oModelHist, "HistoricalQMNotifications");
    },

    
    // OEM IDS data app URL: http://localhost:5002/vehiclemeasurements/supplier?page=1&size=5
    onGETadditionalData: async function () {
      var getRequestParameter = this.getView().getModel("requestDataSettings").getProperty("/UserSettings");
      let page = JSON.stringify(getRequestParameter.pages);
      let size = JSON.stringify(getRequestParameter.pageSize);
      // var url = 'api/users'; // 
      var url = 'vehiclemeasurements/supplier'+'?page='+page+'&'+'size='+size;
      this.sendFetchHttpRequest('GET', url).
        then(responseData => {
          console.log(responseData);
          this.onGoToDefectAnalysisView(responseData);
        });
    },

    //Common function can be called for both GET and POST.
    sendFetchHttpRequest: function (method, url, data) {
      const options = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return fetch(url, options).
        then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json().then(errResData => {
              const error = new Error('Something went wrong!');
              MessageToast.show("No acknowledgement message from OEM IDS data app");
              if(response.status == 503){
                this.onSubscriptionExpired();
              }
              error.data = errResData;
              throw error;
            });
          }
          return response.json();
        })

    },

    onrequestSettingsPressed: function (oEvent) {
      var oView = this.getView(),
        oItem = oEvent.getSource(),
        sPath;

      // create dialog if can't find the dialog by it's id
      if (!this.byId("requestSettingFragment")) {
        // load asynchronous XML fragment using promise
        Fragment.load({
          id: oView.getId(),
          name: "com.sap.dsc.ids.wty.supplierClerkUI.view.fragments.RequestSettings",
          controller: this
        }).then(function (oDialog) {
          // oDialog is the dialog instance

          // connect dialog to this controller
          oView.addDependent(oDialog);
          // open the dialog
          oDialog.open();
        });
      } else {
        // open the dialog directly
        this.byId("requestSettingFragment").open();
      }
    },

    // function to handle close button press event (in product dialog)
    onCloseSettingDialog: function () {
      this.byId("requestSettingFragment").close();
    },


    // naviagate to Defect Analysis view
    onGoToDefectAnalysisView: function (data) {
      MessageToast.show("Getting data from the connector");
      var myGetResponse = data;
      var oModel = this.getOwnerComponent().getModel("carData")
      oModel.setData(myGetResponse);
      var oRouter = UIComponent.getRouterFor(this);
      // use route name 'DefectAnalysis' here
      oRouter.navTo("DefectAnalysis", {}, true);
    },

    onSubscriptionExpired: function () {
      MessageBox.error("The IDS data has expired");
    },

    onCancelPressed: function () {
      MessageToast.show("No request is generated");
    }

  });
});
