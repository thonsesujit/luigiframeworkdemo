sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/ButtonType",
    "sap/m/Text",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.m.Dialog} Dialog
     * @param {typeof sap.m.Button} Button
     * @param {typeof sap.m.ButtonType} ButtonType
     * @param {typeof sap.m.Text} Text
     * @param {typeof sap.ui.core.Fragment} Fragment
     * @param {typeof sap.m.MessageToast} MessageToast
 */
    function (Controller, JSONModel, Dialog, Button, ButtonType, Text, Fragment, MessageToast, MessageBox) {
        "use strict";

        var aReportInputElements = ["inputReportDescription", "inputCarIdentification", "inputError", "ReportFileUploader"];

        return Controller.extend("com.sap.dsc.ids.wty.garageOwnerUi.controller.View1", {
            onInit: function () {

                
            },

            onPressBtnReportQualityIssues: function (oEvent) {
                var oView = this.getView(),
                    oItem = oEvent.getSource(),
                    sPath;

                //create a dialog if cant find the dialog
                if (!this.byId("reportIssue")) {
                    // load asynchronous XML fragment using promise
                    Fragment.load({
                        id: oView.getId(),
                        name: "com.sap.dsc.ids.wty.garageOwnerUi.view.fragments.ReportIssue",
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
                    this.byId("reportIssue").open();
                }

            },

            onReportIssueSend: function () {
                this.byId("reportIssue").close();
                var oFileUploader = this.byId("ReportFileUploader");
                oFileUploader.upload();
                MessageToast.show("Report request sent");

                if (this.byId("pi-with-animation").getDisplayValue() !== "0%") {
                    var oAmountNumber = this.byId("amountNmbId"),
                        oEuroIndicator = this.byId("indicatorEuroMain");
                    setTimeout(() => {
                        oAmountNumber.setValue(String(parseInt(oAmountNumber.getValue()) + 1.5));
                        oEuroIndicator.setValue(oEuroIndicator.getValue() + 10);
                    }, 4000);
                }

                aReportInputElements.forEach(element => {
                    this.byId(element).setValue("");
                });
                this.inputReportLiveChange();
            },

            onCancelReportIssue: function () {
                this.byId("reportIssue").close();
                //MessageToast.show("No report request sent");
                aReportInputElements.forEach(element => {
                    this.byId(element).setValue("");
                });
                this.inputReportLiveChange();
            },

            onPressBtnCreateWarrantyClaim: function (oEvent) {
                var oView = this.getView(),
                    oItem = oEvent.getSource(),
                    sPath;

                //create a dialog if cant find the dialog
                if (!this.byId("createClaim")) {
                    // load asynchronous XML fragment using promise
                    Fragment.load({
                        id: oView.getId(),
                        name: "com.sap.dsc.ids.wty.garageOwnerUi.view.fragments.CreateClaim",
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
                    this.byId("createClaim").open();
                }
            },

            onClaimRequestSend: function () {
                var oIconTabBar = this.byId("bar0");
                if (oIconTabBar.getSelectedKey() == "0") {
                    oIconTabBar.setSelectedKey("2");
                    this.byId("btnCreateClaimSend").setText("Send");
                } else {
                    var oFileUploader = this.byId("ClaimFileUploader");
                    oFileUploader.upload();
                    var url = "claims";
                // var url = 'http://httpbin.org/post';

                    var myClaimPayload = this.getView().getModel("claimpayload").getProperty("/Claim");
                    this.sendFetchHttpRequest('POST',url, myClaimPayload).
                    then(responseData => {
                        console.log(responseData);
                        this.byId("createClaim").close();
                        this.successWarrantyClaim(responseData);
                    }).
                    catch(err => {
                        console.log(err, err.data);
                        MessageToast.show("Error:" + err);
                    });
                    // this.onPOSTClaim(myClaimPayload, url);
                }
            },

            onCancelClaimForm: function () {
                this.byId("createClaim").close();
                MessageToast.show("No claim request sent");
            },

            /* POST request to the OEM IDS data app API */
            //TODO:For v1.0: CORS bypass proxy needs to reimplemented. This needs to be fixed in next issue.

            // onPOSTClaim: async function (payload, url) {
            //     var payload = JSON.stringify(payload);
            //     var myHeaders = new Headers();
            //     myHeaders.append("Content-Type", "application/json");
            //     var requestOptions = {
            //         method: 'POST',
            //         mode: 'cors',
            //         headers: myHeaders,
            //         body: payload,
            //         redirect: 'follow',
            //         credentials: 'omit'
            //     };
            //     // await fetch(url, requestOptions)
            //         await fetch('http://httpbin.org/post', requestOptions)
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log('Success:', data);
            //             this.successWarrantyClaim(data);
            //         })
            //         .catch((error) => {
            //             console.error('Error:', error);
            //             MessageToast.show("No acknowledgement message from OEM IDS data app");
            //         });

            // },

            sendQMNotificationRequest: function() {
                var notificationpayload = this.getView().getModel("notificationPayload").
                getProperty("/NotificationClaims");
                var url = 'qmnotifications/oem';
                // var url = 'http://httpbin.org/post';
                this.sendFetchHttpRequest('POST', url, notificationpayload).
                then(responseData => {
                    console.log(responseData);
                this.byId("reportIssue").close();
                this.successNotificationClaim(responseData);

                  })
                  .catch(err => {
                    console.log(err, err.data);
                    MessageToast.show("Error:" + err);
                  });

                var oAmountNumber = this.byId("amountNmbId"),
                    oEuroIndicator = this.byId("indicatorEuroMain"),
                    oTotalReports = this.byId("idTotalNmbReports");

                oTotalReports.setValue(String(parseInt(oTotalReports.getValue())+1));
                setTimeout(() => {
                    oAmountNumber.setValue(String(parseInt(oAmountNumber.getValue())+1.5));
                    oEuroIndicator.setValue(oEuroIndicator.getValue()+5);
                }, 4000);
            },

            //Common function can be called for both GET and POST. For GET just ignore the data part.
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
                                error.data = errResData;
                                throw error;
                            });
                        }
                        return response.json();
                    })

            },

            successWarrantyClaim: function (data) {
                var myData = data.claimId;
                //Step1: create a new JSON model and set this data to model object
                // var oModel = new JSONModel();
                // oModel.setData({
                //     "newData": myData
                // });
                // this.getView().setModel(oModel, "responseModel");
                MessageBox.success("Warrenty claim request was acknowledged with a claimid: " + myData);

            },

            successNotificationClaim: function (data) {
                var myData = data.objectNumber;
                // //Step1: create a new JSON model and set this data to model object
                // var oModel = new JSONModel();
                // oModel.setData({
                //     "newData": myData
                // });
                // this.getView().setModel(oModel, "responseModel");
                MessageBox.success("QM Notification claim request was acknowledged with a Object Number: " + myData);

            },

            //to unlist selected objects from the table
            onUnlistObjects: function () {
                var aSelectedProducts, i, sPath, oItems, oitemType;

                aSelectedProducts = this.byId("claimItemTable").getSelectedItems();
                if (aSelectedProducts.length) {
                    for (i = 0; i < aSelectedProducts.length; i++) {
                        oItems = aSelectedProducts[i];
                        oitemType = oItems.getBindingContext().getProperty("itemType");
                        sPath = oItems.getBindingContext().getPath();
                        this.getModel().remove(sPath, {
                            success: this._handleUnlistActionResult.bind(this, oitemType, true, i + 1, aSelectedProducts.length),
                            error: this._handleUnlistActionResult.bind(this, oitemType, false, i + 1, aSelectedProducts.length)
                        });
                    }
                } else {
                    this._showErrorMessage(this.getModel("i18n").getResourceBundle().getText("TableSelectProduct"));
                }
            },



            inputReportLiveChange: function () {
                var progressIndicator = this.byId("pi-with-animation"),
                    percentValue = 0;

                aReportInputElements.forEach(element => {
                    if (this.byId(element).getValue() !== "") {
                        percentValue = percentValue + 25;
                    }
                });

                switch (percentValue) {
                    case 0:
                        progressIndicator.setState("Error");
                        break;
                    case 25:
                        progressIndicator.setState("Warning");
                        break;
                    case 50:
                        progressIndicator.setState("None");
                        break;
                    case 75:
                        progressIndicator.setState("Information");
                        break;
                    default:
                        progressIndicator.setState("Success");
                        break;
                }

                progressIndicator.setPercentValue(percentValue);
                progressIndicator.setDisplayValue(percentValue.toString() + "%");
                // this.byId("indicatorEuro").setValue(percentValue);
            },

            onIconTabBarSelect: function (oEvent) {
                if (oEvent.getParameters("selectedItem").key == "2") {
                    this.byId("btnCreateClaimSend").setText("Send");
                } else {
                    this.byId("btnCreateClaimSend").setText("Next");
                }
            }
        });
    });