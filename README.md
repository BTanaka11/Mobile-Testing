# Mobile-Testing
Testing CSS screen orientation API and makeshift modal.

# Expected Behavior
Desktop - static navbar on top.

Mobile - upon logging in, a programmatic attempt to enter full screen and switch from portrait to landscape view. For whichever of these 2 succeeds, they will be reverted upon logging out.
If user is already in either of these 2 modes prior to logging in, they won't be reverted upon logging out. If programmatic attempt to switch to landscape view fails, which is expected for iPhone, the bottom right section should advise user to manually rotate device for best experience. If at any time it's in landscape view, regardless whether done programmatically or manually, the navbar should switch to a 3-line hamburger menu icon within game screen, which upons up navbar as modal if clicked. If at any time it's in portrait mode, the navbar will be identical to desktop version. 
