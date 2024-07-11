/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search', 'N/ui/dialog'],
/**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{dialog} dialog
 */
function(email, record, runtime, search, dialog) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        let currentRec = scriptContext.currentRecord;
        let fieldid = scriptContext.fieldId;
        if (fieldid === 'custrecord_jj_language_q2') {
            try {
                let language = currentRec.getValue({
                    fieldId: 'custrecord_jj_language_q2'
                });
                let amount = 0;
                let languageSearch = search.create({
                    type: "customrecord_jj_fee_details",
                    filters:
                        [
                            ["custrecord_jj_language", "anyof", language]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "custrecord_jj_language", label: "Language" }),
                            search.createColumn({ name: "custrecord_jj_amount", label: "Amount" })
                        ]
                });
                languageSearch.run().each(function (result) {
                    amount = result.getValue({
                        name: "custrecord_jj_amount"
                    });
                });
                log.error('Amount: '+amount);
                currentRec.setValue({
                    fieldId: 'custrecord_jj_fee_q2',
                    value: amount,
                    ignoreFieldChange: true
                });
            }
            catch (error) {
                log.error('Error in amount block:' + error);
            }
        }
        if (fieldid === 'custrecord_jj_transaction_currency') {
            try {
                // let currency=currentRec.getValue({
                //     fieldId: 'custrecord_jj_transaction_currency'
                // });
                let currency = currentRec.getText({
                    fieldId: 'custrecord_jj_transaction_currency'
                });
                let amount=currentRec.getValue({
                    fieldId: 'custrecord_jj_fee_q2'
                });
                let exchangeRate=1;
                log.error('Currency: '+currency);
                log.error("Amount: "+amount);
                // const freecurrencyapi = new Freecurrencyapi('fca_live_jPzUlNbwXZ64p5A6Qiwo99xjn2S3xNlXavdSI1Ue');
                // freecurrencyapi.latest({
                //     base_currency: 'INR',
                //     currencies: currency
                // }).then(response => {
                //     console.log(response);
                // });

                log.error("Exchange rate: "+exchangeRate);
                let transamount=exchangeRate*amount;
                currentRec.setValue({
                    fieldId: 'custrecord_jj_exchange_rate_q2',
                    value: transamount,
                    ignoreFieldChange: true
                });
            }
            catch (error) {
                log.error('Error in currency block: ' + error);
            }
        }

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

    }

    return {
        // pageInit: pageInit,
        fieldChanged: fieldChanged
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
