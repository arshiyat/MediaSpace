Ext.define('MediaSpace.view.SettingsView', {
    extend: 'Ext.Panel',

    xtype: 'setttingview',

    config:{
        // layout: 'vbox',
        fullscreen: true,
        defaultBackButtonText:'Settings',
        items:[
            {
                xtype:'toolbar',
                docked: 'top',
                // title: 'Settings',
                itemId:'settingsBar',
                items: [
                    {
                        xtype:'button',
                        // iconCls: 'arrow_left',
                        ui:'back',
                        text:'Main',
                        itemId:'SettingsBackbutton',
                        align: 'left'
                    },
                    {
                        xtype:'spacer'
                    }
                ]

            },
            {
                xtype:'list',
                    title: 'Settings',
                    height: '100%',
                    itemId:'settingslist',
                    scrollable: 'vertical',
                    onItemDisclosure : true,
                    itemTpl: '{title}',
                    data: [
                        { title: 'Filters' },
                        // { title: 'Setting' },
                        // { title: 'Setting' },
                        // { title: 'Setting' }
                    ]
            },
        ]

    }
 });