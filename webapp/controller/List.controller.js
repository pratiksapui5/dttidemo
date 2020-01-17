sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"masspo/model/formatter"
], function (Controller, MessageBox, MessageToast, Filter, FilterOperator, JSONModel, formatter) {
	"use strict";

	return Controller.extend("masspo.controller.List", {
		formatter: formatter,
		onInit: function () {
			var that = this;
			that.FillDocumentType();
			//that.FillPOList();
		},

		FillDocumentType: function () {
			var oModelDocType = this.getOwnerComponent().getModel("DocumentTypeSet");
			var doctyp = this.getView().byId("doctyp");
			doctyp.setModel(oModelDocType);
		},

		FillPOList: function () {
			var oModelPOHeaders = this.getOwnerComponent().getModel("POHeaderSet");
			var oMastertable = this.getView().byId("table");
			oMastertable.setModel(oModelPOHeaders);
			var that = this;
			that.FillPOItemsList();
		},

		FillPOItemsList: function () {
			var oModelPOItems = this.getOwnerComponent().getModel("POItemSet");
			var oDetailTable = this.getView().byId("tblDetail");
			oDetailTable.setModel(oModelPOItems);
		},

		handleDocTypeSearch: function (oEvent) {
			/*var filters = [];
			var sDocTypeID = this.getView().byId("doctyp").getSelectedKey();
			if (sDocTypeID && sDocTypeID.length > 0) {
				var filter = new sap.ui.model.Filter("DocTypeID", sap.ui.model.FilterOperator.EQ, sDocTypeID);
				filters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("table");
			var binding = list.getBinding("items");
			binding.filter(filters);*/
		},

		handlePOSearch: function (oEvent) {

			var filters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("PONumber", sap.ui.model.FilterOperator.Contains, sQuery);
				filters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("table");
			var binding = list.getBinding("items");
			binding.filter(filters);

		},

		onApprove: function (evt) {
			var table = this.getView().byId("table");
			var selectedItems = table.getSelectedItems();
			
			if (selectedItems.length === 0) {
				MessageBox.warning("Please select at least one item !");
			} else {
				
				MessageBox.success("Purchase Order Approved Successfully");
			}
		},

		onReject: function (evt) {
			var table = this.getView().byId("table");
			var selectedItems = table.getSelectedItems();
		
			if (selectedItems.length === 0) {
				MessageBox.warning("Please select at least one item !");
			} else {
				
				MessageBox.success("Purchase Order Rejected Successfully");
			}
		},
		
		onPress1: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var objPO = this.getView().byId("panel1").getHeaderText();

			oRouter.navTo("Detail", {
				PONumber: objPO
			});
		},

		onPress2: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var objPO = this.getView().byId("panel2").getHeaderText();

			oRouter.navTo("Detail", {
				PONumber: objPO
			});
		}

	});
});