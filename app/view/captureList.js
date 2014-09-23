Ext.define('MediaSpace.view.captureList', {

    extend: 'Ext.List',
    xtype: 'captureList',

    config: {

        
        id:'capturelist',
        //store: 'myStoreID',
        limit: 10,
        disableSelection: true,
        height:'100%',

        // plugins: [
        //     { type: 'listpaging' },
        //     { type: 'pullrefresh' }
        // ],

        itemTpl:'<h1>{title} </h1>',//' <img src="{url}"></img>',
                //itemCls:'capture-entry',
                 data: [
        { title: 'Item 1' },
        { title: 'Item 2' },
        { title: 'Item 3' },
        { title: 'Item 4' }
    ]
    }
});
