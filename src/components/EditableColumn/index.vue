<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip v-if="!editMode && !showInput"
                :placement="toolTipPlacement"
                :open-delay="toolTipDelay"
                :content="toolTipContent">
      <div tabindex="0" 
           class="cell-content edit-enabled-cell"
           @keyup.enter="onFieldClick">
        <slot name="content"></slot>
      </div>

    </el-tooltip>
    <component :is="editableComponent"
               v-if="editMode || showInput"
              ref="input"
              @focus="onFieldClick"
              @keyup.enter.native="onInputExit"
              v-on="listeners"
              v-bind="$attrs"
              v-model="model"
              >
        <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>
<script>
export default {
  name: 'editable-cell',
  inheritAttrs: false,
  props: {
    value: {
      default: ''
    },
    toolTipContent: {
      type: String,
      default: 'Click to edit'
    },
    toolTipDelay: {
      type: Number,
      default: 500
    },
    toolTipPlacement: {
      type: String,
      default: 'top-start'
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: 'el-input'
    },
    closeEvent: {
      type: String,
      default: 'blur'
    }
  },
  data() {
    return {
      editMode: false,
      isChanged: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        // this.$emit('on-input', val)
        this.isChanged = true
      }
    },
    listeners() {
      return {
        [this.closeEvent]: this.onInputExit,
        ...this.$listeners
      }
    }
  },
  methods: {
    onFieldClick() {
      this.editMode = true
      this.$nextTick(() => {
        const inputRef = this.$refs.input
        if (inputRef && inputRef.focus) {
          inputRef.focus()
        }
      })
    },
    onInputExit() {
      this.editMode = false
      if (this.isChanged) {
        this.$emit('on-input')
        this.isChanged = false
      }
    },
    onInputChange(val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style>
.cell-content {
  min-height: 40px;
  padding-left: 5px;
  padding-top: 5px;
  border: 1px solid transparent;
}
.edit-enabled-cell {
  border: 1px dashed #409eff;
}
</style>
