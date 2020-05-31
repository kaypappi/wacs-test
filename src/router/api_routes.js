export const API={
    protocol:'https://',
    host:'wacs2.herokuapp.com/'
}

export const baseUrl= API.protocol+API.host+'api/v1/'

export const LOANOFFERSAPI={
    view:baseUrl+'creditor/offer/view',
    update:baseUrl+ 'creditor/offer/update',
    
}
