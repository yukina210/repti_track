import Autocomplete from "stimulus-autocomplete";

export default class extends Autocomplete {
  connect() {
    super.connect();
  }

  async fetchResults(query) {
    const target = this.element.dataset.target;
    let endpoint;

    if (target === 'questions') {
      endpoint = `/questions/autocomplete?query=${query}`;
    } else if (target === 'pets') {
      endpoint = `/pets/autocomplete?query=${query}`;
    } else {
      console.error('Unknown target for autocomplete');
      return [];
    }

    const response = await fetch(endpoint);
    const results = await response.json();
    return results.map(result => ({ value: result, label: result }));
  }
}
