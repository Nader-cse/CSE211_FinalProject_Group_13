const budgetForm = document.getElementById("budget-form");

if (budgetForm) {
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const ticketPrice = Number(document.getElementById("tickets").value);
    const quantity = Number(document.getElementById("quantity").value);
    const travelCost = Number(document.getElementById("travel").value);
    const accommodationCost = Number(document.getElementById("accommodation").value);

    const totalCost =
      (ticketPrice * quantity) + travelCost + accommodationCost;

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
  });
}
