import { clearContainers } from "./clearContainers";
const body=document.body
describe('testing clear containers',()=>{
    test('clear containers',()=>{
        const all =document.createElement('div')
        all.innerHTML='ranodom text'
        all.id='All'
        body.appendChild(all)
        const working =document.createElement('div')
        working.innerHTML='ranodom text'
        working.id='Working'
        body.appendChild(working)
        const pending =document.createElement('div')
        pending.innerHTML='ranodom text'
        pending.id='Pending'
        body.appendChild(pending)
        const completed =document.createElement('div')
        completed.innerHTML='ranodom text'
        completed.id='Completed'
        body.appendChild(completed)

        clearContainers(all,working,pending,completed)

        expect(document.querySelector('#All').innerHTML).toBe('')
        expect(document.querySelector('#Working').innerHTML).toBe('')
        expect(document.querySelector('#Pending').innerHTML).toBe('')
        expect(document.querySelector('#Completed').innerHTML).toBe('')
    })
})