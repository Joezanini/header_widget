function prog() {

}

const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = /* html */`
        <style>
            :host {
                display: block;
            }
            :host([inprogress]) {
                transform: scale(1.1);
                transform-origin: top left;
            }
            .btn{
                background-color:rgb(0, 145, 255);
                color: white;
                border: none;
                border-radius: 15px;
                padding: 0 2rem;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                box-shadow: 0 4px 14px 0 rgb(0, 145, 255);
            }

            .btn:hover {
                background-color: rgb(0, 174, 255);
            }

            .btn:disabled {
                background-color: rgb(0, 251, 255);
            }

            .fading {
                animation: fading 0.5s infinite
            }

            @keyframes fading {
                0% {
                    color: #6aa8f0;
                }
                50% {
                    color: white;
                }
                100% {
                    color: #6aa8f0;
                }
            }
        </style>
        <button class="btn"><slot>Button T</slot></button>
`

class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        this.initialValue = this.innerHTML;
        this.button.addEventListener("click", (event) => {
            event.stopPropagation();
            this.innerHTML = "Loading...";
            this.button.setAttribute("disabled", "true");
            this.button.classList.add('fading');
            setTimeout(() => {
                this.innerHTML = this.initialValue;
                this.button.removeAttribute("disabled");
                this.button.classList.remove('fading');
            }, 2000);
        });
    }
}

customElements.define("app-button", Button);