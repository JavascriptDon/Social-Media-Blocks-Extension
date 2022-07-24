import bodymovin from 'lottie-web';

/**
 * Class that handles everything to do with Lottie animations.
 */
export default class LottieAnimation {

  private animationInstance;

  constructor(private lottieAnimationDetails: any) {
    this.animationInstance = bodymovin.loadAnimation({
      // @ts-ignore
      wrapper: this.lottieAnimationDetails.wrapper,
      animType: 'svg',
      loop: true,
      animationData: this.lottieAnimationDetails.animationData,
    });
  }

  get lottieAnimationInsatnce() {
    return this.animationInstance;
  }

}
