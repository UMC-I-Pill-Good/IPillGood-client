export const inputFields = [
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
    type: 'text',
    isDuplicateCheck: false,
  },
  {
    name: 'id',
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
    type: 'text',
    isDuplicateCheck: true,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    type: 'email',
    isDuplicateCheck: false,
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '영문, 숫자 포함 8자 이상 입력해주세요',
    type: 'password',
    isDuplicateCheck: false,
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해주세요',
    type: 'password',
    isDuplicateCheck: false,
  },
] as const;

export const agreementLists = [
  {
    id: 'terms',
    label: '서비스 이용약관 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'health',
    label: '건강 정보 수집 및 이용 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신 동의 (선택)',
    href: '#',
    required: false,
  },
] as const;
