
const hEl = (n,c,b) => {
    const temp = document.createElement('div')
    temp.innerHTML = `
        <span class='fs-3'>${n}</span>
        <span class='fs-3 text-danger mx-2'>${c}</span>
        <span class='fs-3 text-success'>${b}</span>
    `
    return temp
}
const comp = (str) => {
    const data = [0,0]

    str.toString().split('').sort().forEach( el => {
        if (targetSort.includes(el)) data[0]++
    })
    str.toString().split('').forEach( (el, i) => {
        if(el == targetA[i]){
            data[0]--
            data[1]++
        }
    })
    return data
}

const createTarget = () => {
    let temp = {}
    let tryN = Math.floor(Math.random()*10000)
    
    tryN.toString().split('').forEach(el => {
        temp[el]?temp[el]++:temp[el] = 1
        if(temp[el] === 2){
            tryN = createTarget()
        }
    })

    return tryN
}

const history = document.querySelector('#history')
const input = document.querySelector('#input')

const target = createTarget(); console.log(target)
const targetA = target.toString().slice('') 
const targetSort = target.toString().split('').sort()

document.querySelector('#main').addEventListener('click', main = (e) => {

    input.classList.remove('is-invalid')
    if(input.value.length !== 4){
        input.classList.add('is-invalid')
        return
    }

    const data = comp(input.value)

    history.appendChild( hEl(input.value, data[0], data[1]) )

    if(data[1]===4){ alert(`Congrat! \n${target}`); document.location.reload() }

    input.value = ''
    input.focus()
})

document.addEventListener( 'keydown', (e)=>{
    if(e.key == 'Enter'){
        main(e)
    }
} )