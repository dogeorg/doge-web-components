import { LitElement, css, html } from "../../lib/doge-init.js"

// Array of messages
const messages = [
  "!!!",
  "Woof",
  "much wow",
  "goodest doge",
  "bork bork",
  "very bark",
  "fright",
  "Much Crypto, So Wow",
  "Very Meme, Much Value",
  "Wow, Much Effort",
  "Wow, So Sparkle",
  "Much Mystery, So Secret",
  "Much Fun, Very Laugh"

];

// Array of fluorescent colors for random text color
const colors = [
  "#FF69B4", // Hot Pink
  "#00FFFF", // Electric Blue
  "#32CD32", // Lime Green
  "#FFA500", // Bright Orange
  "#8A2BE2", // Vivid Purple
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FF0000", // Red
  "#00FFCC"  // Fluorescent Teal
];


export class DogeBark extends LitElement {
    
  //my properties
    // add title 
    // add img
    //text vertical adjustment
    static properties = {
      title: {type: String},
      img_url: {type: String},
      verticalTextAdjustment: {type: String},
      horizontalTextAdjustment: {type: String},
    }


  handleBubbleClick(event) {
    console.log(event)
    // display a random message and randomize color
    this.displayRandomMessage();
  }

  displayRandomMessage() {
    // Generate a random index based on the array length
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomColorIndex = Math.floor(Math.random() * colors.length); // Added for random color
  
    // Select the message element and update the text with a random message and color
    const messageElement = this.shadowRoot.getElementById("message");
    messageElement.textContent = messages[randomIndex];
    messageElement.style.color = colors[randomColorIndex]; // Added for random color
  }

  firstUpdated() {
    this.displayRandomMessage();
  }

  renderTitle() {
    if (this.title) {
      return html`
        <h1 class="provided-title-bubble" >
          ${this.title}
        </h1>
      ` 
    }
  }

  renderImg() {
    if (this.img_url) {
      return html`
        <img src="${this.img_url}" alt="provided-img"></img>
      `
    }
  }

	render() {
		return html`
			<div class="body">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Linden+Hill:ital@0;1&family=Mea+Culpa&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">


        ${this.renderImg()}



        <div class="textwrap" style="
          --desired-margin-top: ${this.verticalTextAdjustment};
          --desired-margin-left: ${this.horizontalTextAdjustment};
        ">
          
          ${this.renderTitle()}

          
          <div id="bubble" @click=${this.handleBubbleClick}>
            <div class="arrow"></div>
            <span id="message"></span>
          </div>
        </div>

        
      
       
      </div>
		`;
	}

  static styles = css`

    


    .comic-neue-regular {
      font-family: "Comic Neue", serif;
      font-weight: 400;
      font-style: normal;
    }

    .textwrap {
      margin-top: 0px;
      margin-left: 0px;
    }

    @media(min-width:600px) {
      .textwrap {
          margin-top: var(--desired-margin-top);
          margin-left: var(--desired-margin-left);
      }
    }

    .comic-neue-bold {
      font-family: "Comic Neue", serif;
     font-weight: 700;
      font-style: normal;
    }
    


    .body {
      display: flex;
      flex-direction: column;
    }   

    @media(min-width: 700px){
      .body {
        display: flex;
        flex-direction: row;
      }  
    } 
  

    .provided-title-bubble{
      font-family: "Comic Neue", serif;
      font-style: normal;
      font-weight: 20px;
      padding: 10px;
      font-size: 30px;
      transform: rotate(-4deg)

      
    }
    

    @keyframes wiggle {
      0% { transform: rotate(0deg); }
      80% { transform: rotate(0deg); }
      85% { transform: rotate(10deg); }
      95% { transform: rotate(-10deg); }
      100% { transform: rotate(0deg); }
    }

    
    #bubble {
      padding: 20px;
      font-family: "Comic Neue", serif;
      position: absolute;
      background: #eee;
      border-radius: 26px;
      text-align: center;
      animation: wiggle 2.5s infinite;
    }

    #message {
      font-family: "Comic Neue", serif;
      font-weight: 900;
      font-size: 50px;
      user-select: none;
      display: inline-block;
      padding: 0 10px;
    }

    .arrow {
      width: 0;
      height: 0;
      border-top: 20px solid transparent;
      border-right: 20px solid #eee;
      border-bottom: 20px solid transparent;
      transform: translate(-39px, 0px); 
      position: absolute;
    }
    
    @media(max-width: 700px){
      .arrow {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid #eee;
      transform: translate(0px, -59px); 
      position: absolute;
      }  
    } 
    
  `;
}

customElements.define("doge-bark", DogeBark);