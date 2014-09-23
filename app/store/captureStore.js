Ext.define('MediaSpace.store.captureStore', {
	extend: 'Ext.data.Store',
	
    
    config:
    {
     model: 'MediaSpace.model.captureModel',
     storeId: 'myStoreID',
        // data:[
	       //  {
	       //  	title:'title1',
	       //  	url:'url1',
	       //  	type:'type1',
	       //  	srcUrl:'srcUrl'
	       //  }, 
	       //  {
	       //  	title:'title2',
	       //  	url:'url2',
	       //  	type:'type2',
	       //  	srcUrl:'srcUrl2'
	       //  }
        // ],
        

        proxy: {
    		type: 'localstorage',
			},

		sorters:[{ property: 'dateStamp', direction: 'DESC'}],               
		grouper: {
		 sortProperty: 'dateStamp',
		    direction: 'DESC',
		    groupFn: function (record) { 
		        if (record && record.data.dateStamp) {
		        	var formated = Ext.Date.format(new Date(record.data.dateStamp),'d-m-Y');
		            return formated;
		        } else {
		            return '';
		        }
	    	}
    	}
    }
});