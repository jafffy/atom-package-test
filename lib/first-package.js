'use babel';

import FirstPackageView from './first-package-view';
import { CompositeDisposable } from 'atom';

export default {

  firstPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.firstPackageView = new FirstPackageView(state.firstPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.firstPackageView.getElement(),
      visible: true
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'first-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.firstPackageView.destroy();
  },

  serialize() {
    return {
      firstPackageViewState: this.firstPackageView.serialize()
    };
  },

  toggle() {
    console.log('FirstPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
