sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * formatter for list item highlight status on "DiscontinuedDate":
         * if DiscontinuedDate is not undefined or null, return "Warning" status;
         * otherwise, return "Success" status;
         */  
        claimStatus: function(value){
            if(value){
                return "Indication02";
            }else{
                return "Indicationo4";
            }
        }

    }
}, /* bExport= */ true);