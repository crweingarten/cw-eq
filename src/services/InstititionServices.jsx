import axios from 'axios'

class InstitutionService {
   
    static getAll(onSuccess, onError) {
        axios.get('/api/institutions?filters=STALP%3AIA%20AND%20ACTIVE%3A1&fields=ZIP%2COFFDOM%2CCITY%2CCOUNTY%2CSTNAME%2CSTALP%2CNAME%2CACTIVE%2CCERT%2CCBSA%2CASSET%2CNETINC%2CDEP%2CDEPDOM%2CROE%2CROA%2CDATEUPDT%2COFFICES&sort_by=OFFICES&sort_order=DESC&limit=10&offset=0&format=json&download=false&filename=data_file')
            .then(response => onSuccess(response.data))
            .catch(error => onError(error));
    }
    
}
export default InstitutionService