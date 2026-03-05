document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses= JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = 0
    renderExpenses()
    updateTotal()

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name=expenseNameInput.value.trim()
        const amount= parseFloat(expenseAmountInput.value.trim())
        if(name!=="" && !isNaN(amount) && amount>0){
            const newExpense={
                id:Date.now(),
                name: name,
                amount:amount,
            }
            expenses.push(newExpense)
            saveExpenses()
            renderExpenses()
            updateTotal()

            //clear input
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    })


    function calculateTotal(){
        return expenses.reduce((sum,expense)=> (sum+expense.amount),0) //reduce( function , initialValue ) so here the function is (sum,expense)=> (sum+expense.amount) which is an arrow function or we can say in this case a callback function,which is passed inside another function(reduce) function
    }

    function saveExpenses(){
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }

    function updateTotal(){
        totalAmount=calculateTotal()
        totalAmountDisplay.textContent=totalAmount.toFixed(2)
    }

    function renderExpenses(){
        expenseList.innerHTML=""
        expenses.forEach(expense => {
            const li=document.createElement('li')
            li.innerHTML=`${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>`
            expenseList.appendChild(li)
        });
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = Number(e.target.dataset.id);// older way is e.target.getAttribute("data-id")
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpenses();
            renderExpenses();
            updateTotal();
        }
    })

})