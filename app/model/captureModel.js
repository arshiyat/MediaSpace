Ext.define('MediaSpace.model.captureModel', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'srcUrl', type:'string'},
            { name: 'dateStamp', type: 'date', dateFormat: 'm/d/Y'}
        ]
    }
});
