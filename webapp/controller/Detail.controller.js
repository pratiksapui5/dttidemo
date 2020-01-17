sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"masspo/model/formatter",
	"sap/m/MessageBox"
], function(Controller, formatter, MessageBox) {
	"use strict";

	return Controller.extend("masspo.controller.Detail", {
		formatter: formatter,

		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function() {
			this.getRouter().navTo("List", {}, true);
		},

		_onRouteMatched: function(oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.arguments.PONumber !== "" || oParameters.arguments.PONumber !== null && oParameters.arguments.PONumber !== "") {
				this.PONumber = oParameters.arguments.PONumber;
				this._getPOInfo(this.PONumber);
			} else {
				MessageBox.error("Error in data");
			}
		},

		_getPOInfo: function(PONumber) {
			
			
			var lblPONumber = this.getView().byId("objectHeader");
			lblPONumber.setTitle("PO Number: " + PONumber);
			
			var filters = [];
			var POFilter = new sap.ui.model.Filter("PONumber", "EQ", PONumber);
			filters.push(POFilter);
			
			var oModelPOItems = this.getOwnerComponent().getModel("POItemSet");
			var tblDetail = this.getView().byId("tblDetail");
			tblDetail.setModel(oModelPOItems);

			
		},

		handlePOSearch: function(oEvent) {
			var query = oEvent.getSource().getValue();
			if (query && query.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("PONumber", sap.ui.model.FilterOperator.Contains, query);
				var oFilter2 = new sap.ui.model.Filter("MaterialDesc", sap.ui.model.FilterOperator.Contains, query);
				var oFilter3 = new sap.ui.model.Filter("PlantName", sap.ui.model.FilterOperator.Contains, query);
				var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3], false);
			}
			var obinding = this.getView().byId("tblDetail").getBinding("items");
			obinding.filter(allFilter);
		},

		onApprove: function(evt) {
			MessageBox.success("Purchase Order Approved Successfully");
			
			/*var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMM_MASS_PO_APPROVE_SRV/", true);
			var busyDialog = new sap.m.BusyDialog();
			
			var itemsArray = [];
			itemsArray.push({
				PONumber: this.PONumber
			});

			var payload = {
				Approved: true,
				POItemSet: itemsArray
			};

			var that = this;
			busyDialog.open(1000);
			oDataModel.create("/POHeaders", payload, {
				success: function(data) {
					MessageBox.success("Purchase Order Approved Successfully");
					that.onNavBack();
					busyDialog.close();
				},
				error: function(oErr) {
					var message = $(oErr.response.body).find('message').first().text();
					MessageBox.error(message);
					busyDialog.close();
				}
			});*/
		},

		onReject: function(evt) {
			MessageBox.success("Purchase Order Rejected Successfully");
			/*var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMM_MASS_PO_APPROVE_SRV/", true);
			var busyDialog = new sap.m.BusyDialog();

			MessageBox.show("Are you sure you want to Reject this Purchase Order?", {
				title: "Confirm",
				icon: sap.m.MessageBox.Icon.CONFIRM,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function(sAction) {
					if (sAction === "YES") {
						var itemsArray = [];
						itemsArray.push({
							PONumber: this.PONumber
						});

						var payload = {
							Approved: false,
							POItemSet: itemsArray
						};

						var that = this;
						busyDialog.open(1000);
						oDataModel.create("/POHeaders", payload, {
							success: function(data) {
								MessageBox.success("Purchase Order Rejected Successfully");
								that.onNavBack();
								busyDialog.close();
							},
							error: function(oErr) {
								var message = $(oErr.response.body).find('message').first().text();
								MessageBox.error(message);
								busyDialog.close();
							}
						});
					}
				}

			}, this);*/

		}

	});

});