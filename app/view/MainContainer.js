Ext.define('MediaSpace.view.MainContainer', {
    extend: 'Ext.Container',
    xtype: 'mainview',
  
   
    config: {
    scroll:'none',

        items: [
            {
                xtype: 'toolbar',
                title: 'Media Space',
                docked: 'top',
                itemId:'mediaBar',

                items: [
                    {
                        xtype:'button',
                        iconCls: 'icon-layout',
                        itemId:'changeView',
                        align: 'left',
                        ui: 'plain'
                    },
                    {
                        xtype:'spacer'
                    },
                    {
                        xtype:'button',
                        iconCls: 'icon-cogs',
                        itemId:'settingButton',
                        align: 'right',
                        ui:'plain'
                    }
                ]
                // }
            },
            //  {
            //     xtype: 'titlebar',
            //     // title: 'Media Space',
            //     // docked: 'top',
            //     itemId:'mediaBar1',

            //     items: [
            //         {
            //             xtype:'searchfield',
            //             placeHolder:'Search',
            //             name:'searchfield'
            //         },
            //         {
            //             xtype:'spacer'
            //         }
            //         // ,
            //         // {
            //         //     xtype:'button',
            //         //     // iconCls: 'icon-cog',
            //         //     text:'S',
            //         //     itemId:'settingButton',
            //         //     align: 'right'
            //         // }
            //     ]
            //     // }
            // },
            {
               xtype: 'toolbar',
               itemId:'widgets',
               layout: {
                            type: 'hbox',                           
                            align: 'strech',                            
                        },
                        height: '100',
                        // width:'100',
                docked: 'bottom',
                items: [
                
                    { xtype:'button',flex:1,itemId:'camera',iconCls:'icon-camera',ui:'plain'},
                    { xtype:'button',flex:1,itemId:'video', iconCls:'icon-camera2',ui:'plain'},
                    { xtype:'button',flex:1,itemId:'audio',iconCls:'icon-microphone',ui:'plain'},
                    { xtype:'button',flex:1,itemId:'note',iconCls: 'icon-pencil', ui:'plain'},
                    // { xtype:'button',flex:1,itemId:'changeView',iconCls: 'icon-dribbble'},
                    { xtype:'button',flex:1,itemId:'sort',iconCls: 'icon-uniE600', ui:'plain' },
                    { xtype:'button',flex:1,itemId:'filter',iconCls:'search', ui:'plain'}
                   
                ]
            },
            {
                xtype:'panel',
                html: '<center>Capture list Empty</center>',
                // align:'center',
                hidden:true,
                itemId:'emptyPanel',
                height:'100%',
                  padding: 100
            },
            
            {
            
                xtype:'list',
                itemId:'capturelist',
                height: '100%',
                scrollable: 'vertical',
                store:'myStoreID',
                itemTpl:'<h1>{type} </h1> <img src="{url}"></img>',
                itemCls:'capture-entry',
                hidden: false,
                grouped: true

               
            },
            
            {
                xtype: 'dataview',
                height: '100%',
                itemId:'gridView',
                styleHtmlContent: true,
                width: '100%',
                layout: {
                    type: 'fit'
                },
                inline: {
                    wrap: true
                },
                itemCls: 'capture-entry1',
                itemTpl: [
                    '<img src="{url}"></img>'
                  
                ],
                store: 'myStoreID',
                hidden: true
                
            }
            
        ]
    }
});
