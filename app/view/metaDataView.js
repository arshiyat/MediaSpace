Ext.define('MediaSpace.view.metaDataView', {
    extend: 'Ext.Panel',

    xtype: 'viewMetaData',

    config:{

    	fullscreen: true,
    	layout: 'vbox',
    	items:[
    	{
            xtype: 'toolbar',
            docked: 'top',
            title: 'Media Details',
            itemId:'titlebarInfo',

            items: [
            {
                xtype:'button',
                // iconCls: 'icon-vcard',
                text:'back',
                itemId:'metaDataBackButton',
                align: 'left',
                ui:'back'
            },
            {
                xtype:'spacer'
            }
            ]
        },
        {
            xtype:'component',
            itemId: 'htmlMetaDataCmp',
            html:'testing...',
            align:'center',
            height:'100%',
            width:'100%'
            // hidden:false
        }
    	
        
    
        ]

    }
 });