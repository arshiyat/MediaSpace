Ext.define('MediaSpace.view.FilterView', {
    extend: 'Ext.form.FormPanel',

    xtype: 'filterview',

    config:{
        // layout: 'vbox',
        fullscreen: true,
        items:[
            {
                xtype:'toolbar',
                itemId:'filterToolbar',
                docked:'top',
                items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'settings',
                    itemId:'filterBackbutton',
                    align:'left'
                }
                ]

            },
            {
                xtype: 'fieldset',
                itemId:'filterForm',
                items:[
                    {
                        xtype: 'checkboxfield',
                        name : 'img',
                        label: 'Image',
                        value: 'Image',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'video',
                        label: 'Video',
                        value: 'Video',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'note',
                        label: 'Note',
                        value: 'Note',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'Audio',
                        label: 'Audio',
                        value: 'Audio',
                        checked: true
                    },

                ]
            },
            
            {
                //  xtype:'panel',
                // layout:'hbox',
                // items:[
                // {
                //     xtype:'button',
                //     text: 'OK',
                //     handler: function() {
                //         var form = Ext.ComponentQuery.query('formpanel')[0],
                //             values = form.getValues();

                //         Ext.Msg.alert(null,
                //             "Tomato: " + ((values.Image1) ? "yes" : "no") +
                //             "<br />Salami: " + ((values.Video) ? "yes" : "no")
                //         );
                //     }
                // },
                // {
                //     xtype:'button',
                //     text: 'Cancel',
                //     handler: function() {
                //        panel.hide();
                //     }  
                // }
                // ]
            }

        ]


    }
 });