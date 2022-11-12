
const TEST_VERSION = {
  LATEST: '2.1'
}

const PH_STAUS = {
  SELECTED: 'selected',
  EDITING: 'selected_for_editing',
  NOT_EDITING: 'non_selected_for_editing',
}
  const PH_BEHAVIOR = {
  MOVABLE: 'movable',
  EDIT_CONTENT: 'able-to-edit',
  ANSWER: 'answer'
}

const PH_CLASS = {
  BTN: 'btn-ph',
  LBL: 'lbl-ph',
  QUESTION: 'question-ph'
}

const PH_ID = {
  BTN: 'btn-ph-',
  LBL: 'lbl-ph-',
  QUESTION: 'question-ph-'
}

const TB_SUPPORT_ENTITY = {
  DROP_RECEIVER: 'drop_receiver',
  BASE_ELEMNT_HOLDER: 'dragable_elements_holder',
  ELEMENT_SETTINGS: 'element_settings',

  ELEMENT_ID_LBL: 'element-id',

  COLUMN_NAME: 'column_name',

  CONTENT_INPUT: 'element-text',
  VALUE_INPUT: 'element-value',
  SAVE_INPUT: 'save-button',
  LOAD_INPUT: 'load-button',
  FILE_INPUT: 'load-input',
  PREVIEW_TEST: 'preview-button',
}

const TEST_BUILDER = {
  SUPPORT_ENTITY: TB_SUPPORT_ENTITY,
  PH_BEHAVIOR: PH_BEHAVIOR,
  PH_CLASS: PH_CLASS,
  PH_ID: PH_ID
}


const JSON_ATTR = {
  QUESTION_LIST: 'question_list',
  VALUE: 'value',
  ACTION: 'action',
  TEXT_CONTENT: 'text_content',
  TYPE: 'type',
  ANSWER_TAGS: 'answertags'
}


const TR_SUPPORT_ENTITY = {
  QUESTION_HOLDER: 'question_holder',

  BTN_NEXT:"click_next",
  BTN_PREV:"click_prev",

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
}

const TR_ATTR = {
  VALUE: JSON_ATTR.VALUE,
  ACTION: JSON_ATTR.ACTION
}

const LOCALSTORAGE = {
  CUR_QUEST: TR_STATUS.SELECTED_QUEST
}

