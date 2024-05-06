import BaseView from 'oroui/js/app/views/base/view';
import $ from 'jquery';
import messenger from 'oroui/js/messenger';

const StockAlert = BaseView.extend({

    productId: null,
    hasStock: false,

    events: {
        'click .create-stock-alert': 'createStockAlert',
        'click .delete-stock-alert': 'deleteStockAlert',
    },

    initialize(options) {
        this.options = {...this.options, ...options};

        this.productId = this.options.productId;
        if(this.productId === undefined){
            this.productId = this.options.product.id;
        }
        this.hasStock = this.options.hasStock;
        if (this.hasStock) {
            $('.delete-stock-alert', this.options.el).show();
        }else{
            $('.create-stock-alert', this.options.el).show();
        }
    },

    createStockAlert: function(e) {
        e.preventDefault();
        const self = this;

        $.ajax({
            url: `/stock-alert/create/${this.productId}`,
            method: 'POST',
            success: function(response) {
                if (response.message && response.status) {
                    messenger.notificationFlashMessage(response.status, response.message);
                    $('.create-stock-alert', self.options.el).hide();
                    $('.delete-stock-alert', self.options.el).show();
                }
            },
            error: function(response) {
                messenger.notificationFlashMessage('error', 'Oups');
            }
        });
    },
    deleteStockAlert: function(e) {
        e.preventDefault();
        const self = this;
        $.ajax({
            url: `/stock-alert/delete/${this.productId}`,
            method: 'DELETE',
            success: function(response) {
                if (response.message && response.status) {
                    messenger.notificationFlashMessage(response.status, response.message);
                    $('.delete-stock-alert', self.options.el).hide();
                    $('.create-stock-alert', self.options.el).show();
                }
            },
            error: function(response) {
                messenger.notificationFlashMessage('error', 'Oups');
            }
        });
    }
});

export default StockAlert
