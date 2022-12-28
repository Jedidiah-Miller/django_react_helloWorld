
export class NewsSource {

  constructor(data) {
    this.name = data.name;
    this.url = data.url;
    this.urlRequirements = data.urlRequirements;
    this.paths = data.paths;
    this.htmlElements = data.htmlElements;
  }

  _blank() {
    this.name = '';
    this.url = '';
    this.urlRequirements = '';
    this.paths = [];
    this.htmlElements = {
      listItem: {
        className: '',
        elementType: ''
      },
      headline: {
        className: '',
        elementType: ''
      },
      image: {
        className: '',
        elementType: ''
      },
      summary: {
        className: '',
        elementType: ''
      },
      time: {
        className: '',
        elementType: ''
      }
    }
  }

  as_snake_case_for_django() {
    return {
      name: this.name,
      url: this.url,
      url_requirements: this.urlRequirements,
      paths: this.paths,
      list_item_elements: {
        list_element: {
          class_name: this.htmlElements.listItem.className,
          element_type: this.htmlElements.listItem.elementType
        },
        headline_element: {
          class_name: this.htmlElements.headline.className,
          element_type: this.htmlElements.headline.elementType
        },
        image_element: {
          class_name: this.htmlElements.image.className,
          element_type: this.htmlElements.image.elementType
        },
        summary_element: {
          class_name: this.htmlElements.summary.className,
          element_type: this.htmlElements.summary.elementType
        },
        time_element: {
          class_name: this.htmlElements.time.className,
          element_type: this.htmlElements.time.elementType
        },
      },
    };
  }


  to_snake_case() {
    return this.transformCase(this.reverse_fn);
  }

  toCamelCase() {
    return this.transformCase(this.fn);
  }

  fn (key) {
    return key.replace(/_([a-z])/g, (_, m) => m.toUpperCase());
  }

  reverse_fn (key) {
    return key.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`);
  }

  transformCase(r, o = this) {
    // transforms an object based on the replacer function provided
      return Object.fromEntries(
        Object.entries(o).map(([k, v]) => {
          return[r(k), typeof v === 'object' ? this.transformCase(r, v) : v];
        })
      );
    }
}