const testEmail=(value)=>{
    const emailpatern=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailpatern.test(value)
    
}
export default {testEmail}