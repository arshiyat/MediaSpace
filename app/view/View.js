Ext.define('MediaSpace.view.View', {
    extend: 'Ext.Panel',

    xtype: 'view',

    config:{

    	fullscreen: true,
    	layout: 'vbox',
    	items:[
    	
        {
            xtype: 'toolbar',
            docked: 'top',
            title: 'Captured Media',
            itemId:'titlebarInfo',

            items: [
            {
                xtype:'button',
                // iconCls: 'icon-vcard',
                text:'back',
                itemId:'backButton',
                align: 'left',
                ui:'back'
            },
            {
                xtype:'spacer'
            },

            {
                xtype:'button',
                iconCls: 'trash',
                iconMask:true,
                // text:'delete',
                itemId:'deleteButton',
                align: 'right',
                ui:'plain'
            }
            ]
        },
    	{
            xtype:'component',
            itemId: 'htmlCmp',
            html:'testing',
            flex:6,
            align:'center',
            height:'100%',
            width:'100%',
            hidden:false
        },
        {
            xtype: 'textareafield',
            itemId:'note',
            label: 'Note',
            maxRows: 10,
            flex:4,
            hidden:true,
       
        },
       
        {
            xtype:'button',
    		html:'Capture details',
    		flex:0.75,
            // height:'30%',
            itemId:'capturedetailsButton',
            iconCls:'icon-info',
            ui:'small'
    	},
        {
                xtype:'button',
                text:'Save',
                itemId:'save',
                flex:1,
                hidden:true

        },
        {
            xtype:'toolbar',
            itemId:'buttonPanel',
            layout:'hbox',
            hidden:true,
            docked:'bottom',
            ui:'light',
            items:[
            {
                xtype:'button',
                text:'play',
                itemId:'play',
                flex:1

            },
            {
                xtype:'button',
                text:'Stop',
                itemId:'stop',
                flex:1
            }
            
            ]
        }
    
        ]

    }
 });