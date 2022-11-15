
const TEST_VERSION = {
  LATEST: '3.0'
}



// ****************** 
// ***** Rules ******
// ****************** 

RULES = {
  ONLY_ONE: 'only_one',
  MULTIPLE_ONE: 'only_one',
  RATE_ONE: 'only_one',
}


// ****************** 
// ** Testbuilder ***
// ****************** 

const JSON_ATTR = {
  TYPE: 'type',

  QUESTION_LIST: 'question_list',
  ATTR_LIST: 'attr_list',
  
  VALUE: 'value',
  ACTION: 'action',
  TEXT_CONTENT: 'text_content',
  ANSWER_TAGS: 'answertags',
  DOM: 'dom',

  TEST_NAME:'Name'
}

const PH_STAUS = {
  SELECTED: 'selected',
  EDITING: 'selected_for_editing',
  NOT_EDITING: 'non_selected_for_editing',
}
const PH_BEHAVIOR = {
  MOVABLE: 'movable',
  EDITABLE: 'able-to-edit',
  ANSWER: 'answer',
  ANSWERS_TAG: 'answer-tags'
}

const PH_CLASS = {
  BTN: 'btn-ph',
  LBL: 'lbl-ph',
  QUESTION: 'question-ph',
  TEST_INFO: 'testinfo-ph',
  RULES: 'rule-ph'
}

const PH_ID = {
  BTN: 'btn-ph-',
  LBL: 'lbl-ph-',
  QUESTION: 'question-ph-',
  TEST_INFO: 'testinfo-ph-',
  RULES: 'rule-ph-'
}

const PH_ATTR = {
  ATTR_LIST: 'attr',
  EDITABLE: 'editable',
  TYPE: JSON_ATTR.TYPE,
  VALUE: JSON_ATTR.VALUE,
  ACTION: JSON_ATTR.ACTION,

  TEST_NAME: JSON_ATTR.TEST_NAME
}

const TB_SUPPORT_ENTITY = {
  DROP_RECEIVER: 'drop_receiver',
  BASE_ELEMNT_HOLDER: 'dragable_elements_holder',
  ELEMENT_SETTINGS: 'element_settings',

  ELEMENT_ID_LBL: 'element-id',

  COLUMN_NAME: 'column_name',

  SAVE_INPUT: 'save-button',
  LOAD_INPUT: 'load-button',
  FILE_INPUT: 'load-input',
  PREVIEW_TEST: 'preview-button',
  USER_SETTINGS: 'user_settings_holder',

  USER_INPUT: 'input-',
}

const TEST_BUILDER = {
  TB_SUPPORT_ENTITY: TB_SUPPORT_ENTITY,
  PH_BEHAVIOR: PH_BEHAVIOR,
  PH_CLASS: PH_CLASS,
  PH_ID: PH_ID
}



// ****************** 
// ** Test runtime **
// ****************** 

const TR_SUPPORT_ENTITY = {
  QUESTION_HOLDER: 'question_holder',

  BTN_NEXT: "click_next",
  BTN_PREV: "click_prev",

  GRADIENT: 'gradient',

  CURRENT_QUESTION_LBL: 'current_question',
  COUNT_QUESTIONS_LBL: 'count_questions',

  HEADER_TEXT: 'header_text',
  TEST_NAME_HEADER: 'test_name'
}

const TR_STATUS = {
  SELECTED_QUEST: 'selected_quest'

}

const TR_CLASS = {
  QUESTION: 'one_question',
  LBL: 'question_text',
  ANSWER: 'answer',
  RULES: 'rule'
}

const TR_ATTR = {
  VALUE: JSON_ATTR.VALUE,
  ACTION: JSON_ATTR.ACTION
}

const LOCALSTORAGE = {
  CUR_QUEST: TR_STATUS.SELECTED_QUEST,
  ANSWERS_TAG: PH_BEHAVIOR.ANSWERS_TAG
}
