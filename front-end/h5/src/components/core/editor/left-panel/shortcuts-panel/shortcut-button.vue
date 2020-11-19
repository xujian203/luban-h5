<script>
export default {
  functional: true,
  props: {
    faIcon: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    clickFn: {
      required: false,
      type: Function,
      default: () => { }
    },
    mousedownFn: {
      required: false,
      type: Function,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, listeners, slots }) => {
    return (
      <button
        class="control"
        onClick={props.clickFn}
        onMousedown={props.mousedownFn}
        disabled={props.disabled}
      >
        <i
          class={['shortcut-icon', 'fa', `fa-${props.faIcon}`]}
          aria-hidden='true'
        />
        <span>{props.title}</span>
      </button>
    )
  }
}
</script>
<style scoped>
.control {
  /* width: 75px; */
  width: 101%;
  height: 70px;
  margin-top: -1px;
  margin-left: -1px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(235, 235, 235);
  color: rgb(91, 107, 115);
  cursor: pointer;
}
/* <script> */
</style>
