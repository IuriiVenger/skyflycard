const whiteLabelConfig = {
  disableLanding: !!process.env.DISABLE_LANDING,
  disableStaticPages: !!process.env.DISABLE_STATIC_PAGES,
};

export default whiteLabelConfig;
