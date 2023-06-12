import axios from "axios"
export const baseUrl: string = 'https://api.skilla.ru/mango/getList'

export const baseOptions = () => {
  return {
    headers: {
      'Authorization': 'Bearer testtoken'
    },
    params: {
      limit: 100,
    }
  }
}
export const recordOptions = (recordId: string, partnershipId: number) => {
  return {
    headers: {
      'Authorization': 'Bearer testtoken'
    },
    params: {
      record: recordId,
      partnership_id: partnershipId
    }
  }
}
export const getCallRecord = async (recordId: string, partnershipId: number) => {
  const data = await axios.post('https://api.skilla.ru/mango/getRecord', null, recordOptions(recordId, partnershipId))
    .then(res => res.data.results)
    .catch(error => console.log(error))
  return data
}
