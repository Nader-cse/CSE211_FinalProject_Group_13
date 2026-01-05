"use strict";

class EventManager 
{
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.events = 
    [
      { name: "Tech Conference 2026", date: "2026-02-15", location: "Cairo", price: 1200 },
      { name: "Music Festival", date: "2026-03-10", location: "Alexandria", price: 800 },
      { name: "Startup Meetup", date: "2026-01-25", location: "Giza", price: 300 }
    ];
    if (this.container) this.renderEvents(this.events);
  }

  renderEvents(eventsList) {
    this.container.innerHTML = "";
    eventsList.forEach(event => 
    {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = 
      `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> ${event.price} EGP</p>
      `;
      this.container.appendChild(card);
    });
  }

  filterEvents(keyword) {
    const filtered = this.events.filter(e =>
      e.name.toLowerCase().includes(keyword.toLowerCase())
    );
    this.renderEvents(filtered);
  }
}

class BudgetCalculator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) this.form.addEventListener("submit", this.calculate.bind(this));
  }

  calculate(event) {
    event.preventDefault();
    const ticketPrice = Number(document.getElementById("tickets").value);
    const quantity = Number(document.getElementById("quantity").value);
    const travel = Number(document.getElementById("travel").value);
    const accommodation = Number(document.getElementById("accommodation").value);
    const total = (ticketPrice * quantity) + travel + accommodation;
    document.getElementById("total-cost").textContent = total.toFixed(2);
    document.dispatchEvent(new CustomEvent("budgetCalculated", { detail: total }));
  }
}

class RegistrationForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) this.form.addEventListener("submit", this.validate.bind(this));
  }

  validate(event) {
    event.preventDefault();
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const selectedEvent = document.getElementById("event-select").value;

    if (!name || !email || !phone || !selectedEvent) {
      alert("Please fill all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    this.form.reset();
    document.dispatchEvent(new Event("userRegistered"));
    window.location.href = this.form.action;
  }
}

class ParallaxController {
  constructor(selector) {
    this.section = document.querySelector(selector);
    if (this.section) window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll()
   {
    const offset = window.pageYOffset;
    this.section.style.backgroundPositionY = offset * 0.5 + "px";
  }
}

class SlidingForm {
  constructor(buttonId, formSelector) {
    this.button = document.getElementById(buttonId);
    this.form = document.querySelector(formSelector);
    if (this.button && this.form) {
      this.button.addEventListener("click", () => this.form.classList.toggle("active"));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new EventManager("upcoming-events");
  new BudgetCalculator("budget-form");
  new RegistrationForm("registration-form");
  new ParallaxController(".hero");

  document.addEventListener("budgetCalculated", e => {
    console.log("Budget Calculated:", e.detail);
  });
});
