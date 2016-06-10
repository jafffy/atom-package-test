'use babel';

import FirstPackage from '../lib/first-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FirstPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('first-package');
  });

  describe('when the first-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.first-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'first-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.first-package')).toExist();

        let firstPackageElement = workspaceElement.querySelector('.first-package');
        expect(firstPackageElement).toExist();

        let firstPackagePanel = atom.workspace.panelForItem(firstPackageElement);
        expect(firstPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'first-package:toggle');
        expect(firstPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.first-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'first-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let firstPackageElement = workspaceElement.querySelector('.first-package');
        expect(firstPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'first-package:toggle');
        expect(firstPackageElement).not.toBeVisible();
      });
    });
  });
});
