<template>
  <div class="notice">
    <div class="bullshit">
      <div class="bullshit-headline">{{ headline + info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      headline: "您的授权id为：",
      info: "685022",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.notice {
  .bullshit {
    position: relative;
    float: left;
    width: 400px;
    padding: 30px 0;
    overflow: hidden;

    &-headline {
      margin-bottom: 10px;
      font-size: 32px;
      font-weight: bold;
      line-height: 24px;
      color: #222;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &-info {
      margin-bottom: 30px;
      font-size: 13px;
      line-height: 21px;
      color: $base-color-gray;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(60px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
