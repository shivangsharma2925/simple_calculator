class Calculator{
    constructor(prev_operand_text,curr_operand_text){
        this.prev_operand_text=prev_operand_text;
        this.curr_operand_text=curr_operand_text;
        this.all_clear();
    }

    all_clear(){
        this.curroperand = '';
        this.prevoperand = '';
        this.operation=undefined;
    }

    delete(){
        this.curroperand = this.curroperand.toString().slice(0,-1)
    }
    append(number){
        if(number === '.' && this.curroperand.includes('.')) return
        this.curroperand = this.curroperand.toString() + number.toString()
    }
    operations(operation){
        if(this.curroperand === '') return
        if(this.prevoperand !== ''){
            this.compute() 
        }
        this.operation=operation
        this.prevoperand = this.curroperand
        this.curroperand = ''

    }
    compute(){
        let computation
        const prev = parseFloat(this.prevoperand)
        const curr = parseFloat(this.curroperand)
        if(isNaN(curr) || isNaN(prev)) return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.curroperand = computation
        this.operation = undefined
        this.prevoperand = ''
    }

    getDisplayNumber(number){
        const stringnumber = number.toString()
        const integerdigit = parseFloat(stringnumber.split('.')[0])
        const decimaldigit = stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigit)){
            integerdisplay=''
        }
        else{
            integerdisplay=integerdigit.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }
        if(decimaldigit!= null){
            return `${integerdisplay}.${decimaldigit}`
        }
        else{
            return integerdisplay
        }
    }
    update_display(){
        this.curr_operand_text.innerText =this.getDisplayNumber( this.curroperand)
        if(this.operation != null){
            this.prev_operand_text.innerText = `${this.getDisplayNumber(this.prevoperand)} ${this.operation}`
        }
        else{
            this.prev_operand_text.innerText = ''
        }
    }
}

const number_buttons = document.querySelectorAll('[data-number]');
const operation_buttons = document.querySelectorAll('[data-operation]');
const allclear_button = document.querySelector('[data-allclear]');
const delet_button= document.querySelector('[data-delete]');
const equal_button = document.querySelector('[data-equal]');
const prev_operand_text = document.querySelector('[data-prev-operand]');
const curr_operand_text = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prev_operand_text,curr_operand_text) 

number_buttons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.append(button.innerText)
        calculator.update_display();
    })
})

operation_buttons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.operations(button.innerText)
        calculator.update_display();
    })
})

equal_button.addEventListener('click',button => {
    calculator.compute();
    calculator.update_display();
})

allclear_button.addEventListener('click',button => {
    calculator.all_clear()
    calculator.update_display()
})

delet_button.addEventListener('click',button => {
    calculator.delete()
    calculator.update_display()
})