<template>
  <div :class="[length == 'long' ? 'long-tagged-input' : 'short-tagged-input']">
    <label :for="id" :class="labelClass">{{label}}</label>
    <span class="form-field-info" v-if="fieldInfo">{{fieldInfo}}</span>
    <div class="tagged-input-box">
      <div class="tag-box left-tag-box" v-if="tagLeft">
        <img :src="`/assets/images/${leftImage}`" />
      </div>
      <input
        v-if="(tagLeft || tagRight) && !commaSeparate"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
        :required="required"
        :disabled="disabled"
        :id="id"
        :min="min"
        :max="max"
        :name="name"
        :placeholder="placeholder"
        :class="resolveClasses"
        @keyup="keyupEvent($event.target.value)"
      />
      <input
        v-model="formatted"
        :type="type"
        :required="required"
        :disabled="disabled"
        :id="id"
        :min="min"
        :max="max"
        :name="name"
        :placeholder="placeholder"
        :class="resolveClasses"
        @blur="handleBlur"
        @focus="handleFocus"
        v-if="(tagLeft || tagRight ) && commaSeparate "
      />
      <div class="tag-box right-tag-box" v-if="tagRight">
        <img :src="`/assets/images/${rightImage}`" />
      </div>
    </div>
    <span v-if="error" class="form-input-error">{{error[0]}}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Array,
      default: () => []
    },
    keyupEvent: {
      type: Function,
      default: () => ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    length: {
      type: String,
      default: "short"
    },
    fieldInfo: {
      type: String,
      default: ""
    },
    tagLeft: {
      type: Boolean,
      default: true
    },
    tagRight: {
      type: Boolean,
      default: false
    },
    leftImage: {
      type: String,
      default: "Chart-bar.svg"
    },
    rightImage: {
      type: String,
      default: "Chart-bar.svg"
    },
    label: String,
    id: String,
    name: String,
    placeholder: String,
    value: [String, Number],
    min: [Number, String],
    max: [Number, String],
    commaSeparate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formatted: ""
    };
  },
  methods: {
    keyupEven() {
      this.keyupEvent(this.name);
    },
    handleBlur(e) {
      if (e.target.value) {
        this.$emit("input", parseInt(e.target.value));
        this.formatted = this.$options.filters.number(e.target.value, "0,0");
      } else {
        this.$emit("input", e.target.value);
        this.formatted = e.target.value;
      }

      console.log(this.formatted, e.target.value);
    },
    handleFocus(e) {
      if (e.target.value) {
        this.formatted = parseInt(e.target.value.replace(/,/g, ""));
      }
    }
  },
  computed: {
    resolveClasses() {
      return this.tagLeft
        ? "tagged-input input-tag-left"
        : "tagged-input input-tag-right";
    }
  },
  watch: {
    // Handles internal model changes.
    formatted: {
      handler(formatted) {
        if (typeof formatted === "number") {
          this.$emit("input", formatted);
        }
      }
    },
    value(newVal) {
      if (this.commaSeparate && newVal) {
        console.log(newVal);
        this.formatted = this.$options.filters.number(parseInt(newVal), "0,0");
      }
    }
  },
  created() {
    if (this.value && this.commaSeparate) {
      this.formatted = this.$options.filters.number(
        parseInt(this.value),
        "0,0"
      );
    }
  }
};
</script>
