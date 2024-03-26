type FormLabelType = {
  title: string;
  isCorrect: boolean;
};

function FormLabel({ title, isCorrect }: FormLabelType) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label style={{ color: isCorrect ? 'green' : '' }}>{title}</label>
      {isCorrect && (
        <i
          style={{ color: '#00bb00', fontSize: '12px' }}
          className="bi bi-check-circle-fill"
        ></i>
      )}
    </div>
  );
}

export default FormLabel;
