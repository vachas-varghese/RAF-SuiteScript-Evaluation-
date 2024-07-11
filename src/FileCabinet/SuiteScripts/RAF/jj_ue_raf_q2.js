/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/file', 'N/log', 'N/record', 'N/search', 'N/render', 'N/url'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{log} log
 * @param{record} record
 * @param{search} search
 * @param{render} render
 * @param{url} url
 */
    (email, file, log, record, search, render, url) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {
            
        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            try {
                let internalid = scriptContext.newRecord.id;
                // let name = scriptContext.newRecord.getValue('custrecord_jj_name_q2');
                // let date = scriptContext.newRecord.getValue('custrecord_jj_date_q2');
                // let country = scriptContext.newRecord.getValue('custrecord_jj_country_q2');
                // let age = scriptContext.newRecord.getValue('custrecord_jj_age_q2');
                // let phone = scriptContext.newRecord.getValue('custrecord_jj_phone_q2');
                // let mail = scriptContext.newRecord.getText('custrecord_jj_email_q2');
                // let base = scriptContext.newRecord.getText('custrecord_jj_base_currency_q2');
                // let transCurrency = scriptContext.newRecord.getText('custrecord_jj_transaction_currency');
                // let amount = scriptContext.newRecord.getValue('custrecord_jj_fee_q2');
                // let tran = scriptContext.newRecord.getValue('custrecord_jj_exchange_rate_q2');
                // log.error("internalid:" + internalid);
                // log.error(name);
                // log.error(date);
                // log.error(country);
                // log.error(age);
                // log.error(phone);
                // log.error(mail);
                // log.error(base);
                // log.error(transCurrency);
                // log.error(amount);
                // log.error(tran);
                // let pdfContent = `Date:${date}-Name:${name}-Country:${country}-Age:${age}-Phone:${phone}-Email:${email}-Language:${language}-Base Currency:${baseCurrency}-Transaction Currency:${transCurrency}-Amount:${amount}-Exchange Rate:${exchangeRate}`;
                // let xmlString = `<?xml version=\"1.0\"?>\n" +
                // // "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n" +
                // // "<pdf>\n<body font-size=\"18\">\nDate:${date}-Name:${name}-Country:${country}-Age:${age}-Phone:${phone}-Email:${email}-Language:${language}-Base Currency:${baseCurrency}-Transaction Currency:${transCurrency}-Amount:${amount}-Exchange Rate:${exchangeRate}\n</body>\n</pdf>`
                // let pdfFile = render.xmlToPdf({
                //     xmlString: xmlString
                // });
                const recUrl = url.resolveRecord({
                    recordType: 'customrecord932',
                    recordId: internalid,
                    isEditMode: false
                });
                log.error(recUrl);
                let adminSearch = search.create({
                    type: search.Type.EMPLOYEE,
                    filters:
                        [
                            ["role", "anyof", "3"]
                        ],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "Internal ID" }),
                            search.createColumn({ name: "entityid", label: "Name" })
                        ]
                });
                adminSearch.run().each(function (result) {
                    let id = result.getValue('internalid');
                    if (id) {
                        email.send({
                            author: -5,
                            body: "The link and pdf file of the details of tution fee query is attached with this mail. <br>" + `<a href=${recUrl}>Link to the record</a>`,
                            recipients: id,
                            subject: 'Tution Fee Query Received for Training'
                            // attachments: pdfFile
                        });
                        log.error("Email send to:" + id);
                    }
                    return true;
                });
            }
            catch (error) {
                log.error(error);
            }
        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
