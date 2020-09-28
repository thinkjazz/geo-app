export class Modal {

  constructor(contentId, fallback) {
    this.fallback = fallback;
    this.contentTemplateElement = document.getElementById(contentId);
    this.modalTemplateElement = document.getElementById('modal-template');
  }

  show() {
    if('content' in document.createElement('template')) {
       const modalElements = document.importNode(this.modalTemplateElement.content, true)
       this.modalElement = modalElements.querySelector('.modal')
       this.backdropElement = modalElements.querySelector('.backdrop')
       const contentElement = document.importNode(this.contentTemplateElement.content, true)
      
       this.modalElement.appendChild(contentElement)
       document.body.insertAdjacentElement('afterBegin', this.modalElement)
       document.body.insertAdjacentElement('afterBegin', this.backdropElement)

    } else {
      //fallback
      console.log(this.fallback)
    }

  }
  hide() {
    if(this.modalElement) {
      document.body.removeChild(this.modalElement)
      document.body.removeChild(this.backdropElement)
      this.modalElement = null
      this.backdropElement = null
    }
  }

}